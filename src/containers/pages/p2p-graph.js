import throttle from "throttleit";
import d3 from "d3";


let STYLE = {
    links: {
        width: 0.7, // default link thickness
        maxWidth: 5.0, // max thickness
        maxBytes: 2097152 // link max thickness at 2MB
    }
}

let COLORS = {
    links: {
        color: '#11101cc6'
    },
    text: {
        subtitle: '#C8C8C8'
    },
    nodes: {
        method: function (d, i) {
            return d.color || "#555367c6";

            return d.me
                ? d3.hsl(210, 0.7, 0.725) // blue
                : d.seeder
                    ? d3.hsl(120, 0.7, 0.725) // green
                    : d3.hsl(55, 0.7, 0.725) // yellow
        },
        hover: '#A9A9A9',
        dep: '#252929'
    }
}

export class P2PGraph {
    constructor(root) {
        if (typeof root === 'string') root = document.querySelector(root)
        const self = this;
        this._root = root
    
        this._model = {
            nodes: [],
            links: [],
        }
    
        this._model.links.forEach(function (link) {
            let source = this._model.nodes[link.source]
            let target = this._model.nodes[link.target]
    
            source.children = source.children || []
            source.children.push(link.target)
    
            target.parents = target.parents || []
            target.parents.push(link.source)
        })
    
        this._svg = d3.select(this._root).append('svg')
    
        this._resize()
    
        this._force = d3.layout.force()
            .size([this._width, this._height])
            .nodes(this._model.nodes)
            .links(this._model.links)
            .on('tick', function () {
                self._link
                    .attr('x1', function (d) {
                        return d.source.x
                    })
                    .attr('y1', function (d) {
                        return d.source.y
                    })
                    .attr('x2', function (d) {
                        return d.target.x
                    })
                    .attr('y2', function (d) {
                        return d.target.y
                    })
    
                self._node
                    .attr('cx', function (d) {
                        return d.x
                    })
                    .attr('cy', function (d) {
                        return d.y
                    })
    
                self._node.attr('transform', function (d) {
                    return 'translate(' + d.x + ',' + d.y + ')'
                })
            })
    
        this._node = this._svg.selectAll('.node')
        this._link = this._svg.selectAll('.link')
    
        this._update()
    
        this._resizeThrottled = throttle(function () {
            self._resize()
        }, 500)
        window.addEventListener('resize', this._resizeThrottled)
    }

    list() {
        return this._model.nodes
    }

    add(node) {
        if (this._getNode(node.id)) throw new Error('add: cannot add duplicate node')
        this._model.nodes.push(node)
        this._update()
    }

    remove(id) {
        let index = this._getNodeIndex(id)
        if (index === -1) throw new Error('remove: node does not exist')

        this._model.nodes.splice(index, 1)
        this._update()
    }

    connect(sourceId, targetId, scale=1) {
        let sourceNode = this._getNode(sourceId)
        if (!sourceNode) throw new Error('connect: invalid source id')
        let targetNode = this._getNode(targetId)
        if (!targetNode) throw new Error('connect: invalid target id')

        if (this.getLink(sourceNode.index, targetNode.index)) {
            throw new Error('connect: cannot make duplicate connection')
        }

        this._model.links.push({
            source: sourceNode.index,
            target: targetNode.index,
            scale: scale
        })
        this._update()
    }

    disconnect(sourceId, targetId) {
        let sourceNode = this._getNode(sourceId)
        if (!sourceNode) throw new Error('disconnect: invalid source id')
        let targetNode = this._getNode(targetId)
        if (!targetNode) throw new Error('disconnect: invalid target id')

        let index = this.getLinkIndex(sourceNode.index, targetNode.index)
        if (index === -1) throw new Error('disconnect: connection does not exist')

        this._model.links.splice(index, 1)
        this._update()
    }

    hasLink(sourceId, targetId) {
        let sourceNode = this._getNode(sourceId)
        if (!sourceNode) throw new Error('hasLink: invalid source id')
        let targetNode = this._getNode(targetId)
        if (!targetNode) throw new Error('hasLink: invalid target id')
        return !!this.getLink(sourceNode.index, targetNode.index)
    }

    areConnected(sourceId, targetId) {
        let sourceNode = this._getNode(sourceId)
        if (!sourceNode) throw new Error('areConnected: invalid source id')
        let targetNode = this._getNode(targetId)
        if (!targetNode) throw new Error('areConnected: invalid target id')
        return this.getLink(sourceNode.index, targetNode.index) ||
            this.getLink(targetNode.index, sourceNode.index)
    }

    seed(id, isSeeding) {
        if (typeof isSeeding !== 'boolean') throw new Error('seed: 2nd param must be a boolean')
        let index = this._getNodeIndex(id)
        if (index === -1) throw new Error('seed: node does not exist')
        this._model.nodes[index].seeder = isSeeding
        this._update()
    }

    rate(sourceId, targetId, bytesRate) {
        if (typeof bytesRate !== 'number' || bytesRate < 0) throw new Error('rate: 3th param must be a positive number')
        let sourceNode = this._getNode(sourceId)
        if (!sourceNode) throw new Error('rate: invalid source id')
        let targetNode = this._getNode(targetId)
        if (!targetNode) throw new Error('rate: invalid target id')
        let index = this.getLinkIndex(sourceNode.index, targetNode.index)
        if (index === -1) throw new Error('rate: connection does not exist')
        this._model.links[index].rate = speedRange(bytesRate)
        this._update()

        function speedRange(bytes) {
            return Math.min(bytes, STYLE.links.maxBytes) *
                STYLE.links.maxWidth / STYLE.links.maxBytes
        }
    }

    getLink(source, target) {
        for (let i = 0, len = this._model.links.length; i < len; i += 1) {
            let link = this._model.links[i]
            if (link.source === this._model.nodes[source] &&
                link.target === this._model.nodes[target]) {
                return link
            }
        }
        return null
    }

    destroy() {
        this._root.remove()
        window.removeEventListener('resize', this._resizeThrottled)

        this._root = null
        this._resizeThrottled = null
    }

    _update() {
        const self = this;

        this._link = this._link.data(this._model.links);
        this._node = this._node.data(this._model.nodes, d => d.id);

        this._link.enter()
            .insert('line', '.node')
            .attr('class', 'link')
            .style('stroke', COLORS.links.color)
            .style('opacity', 0.5);

        this._link.exit().remove();
        this._link.style('stroke-width', d => STYLE.links.width * (d.scale || 1));

        let g = this._node.enter().append('g').attr('class', 'node');
        g.call(this._force.drag);
        g.append('circle')
            .on('mouseover', function (d) {
                d3.select(this).style('fill', COLORS.nodes.hover);
                d3.select(this.parentNode).select("text").style("display", "block");

                d3.selectAll(self._childNodes(d))
                    .style('fill', COLORS.nodes.hover)
                    .style('stroke', COLORS.nodes.method)
                    .style('stroke-width', 2)

                d3.selectAll(self._parentNodes(d))
                    .style('fill', COLORS.nodes.dep)
                    .style('stroke', COLORS.nodes.method)
                    .style('stroke-width', 2)
            })
            .on('mouseout', function (d) {
                d3.select(this).style('fill', COLORS.nodes.method);
                d3.select(this.parentNode).select("text").style("display", "none");

                d3.selectAll(self._childNodes(d))
                    .style('fill', COLORS.nodes.method)
                    .style('stroke', null)

                d3.selectAll(self._parentNodes(d))
                    .style('fill', COLORS.nodes.method)
                    .style('stroke', null)
            });

        this._node
            .select('circle')
            .attr('r', d => self._scale() * ((d.scale || 1) * 10))
            .style('fill', COLORS.nodes.method)

        g.append('text')
            .attr('class', 'text')
            .text(d => d.name)
            .style("fill", "#fff")
            .style("display", "none");
        
        this._node
            .select('text')
            .style('font-size', d => 15 * (Math.log(d.scale || 1) + 1) * self._scale())
            .attr('dx', 0)
            .attr('dy', d => -15 * (d.scale || 1) * self._scale());

        this._node.exit().remove()

        this._force
            .linkDistance(d => 100 * self._scale() * (Math.log(d.scale || 1) + 1))
            .charge(-200 * this._scale())
            .start();
    }

    _childNodes(d) {
        if (!d.children) return []
        const self = this;

        return d.children
            .map(function (child) {
                return self._node[0][child]
            }).filter(function (child) {
                return child
            })
    }

    _parentNodes(d) {
        if (!d.parents) return []
        const self = this;

        return d.parents
            .map(function (parent) {
                return self._node[0][parent]
            }).filter(function (parent) {
                return parent
            })
    }

    _connected(d, o) {
        return o.id === d.id ||
            (d.children && d.children.indexOf(o.id) !== -1) ||
            (o.children && o.children.indexOf(d.id) !== -1) ||
            (o.parents && o.parents.indexOf(d.id) !== -1) ||
            (d.parents && d.parents.indexOf(o.id) !== -1)
    }

    _getNode(id) {
        for (let i = 0, len = this._model.nodes.length; i < len; i += 1) {
            let node = this._model.nodes[i]
            if (node.id === id) return node
        }
        return null
    }

    _scale() {
        let len = this._model.nodes.length
        return len < 10
            ? 1
            : Math.max(0.2, 1 - ((len - 10) / 100))
    }

    _resize(e) {
        this._width = this._root.offsetWidth
        this._height = this._root.offsetHeight

        this._svg
            .attr('width', this._width)
            .attr('height', this._height)

        if (this._force) {
            this._force
                .size([this._width, this._height])
                .resume()
        }
    }

    _getNodeIndex(id) {
        
        for (let i = 0, len = this._model.nodes.length; i < len; i += 1) {
            let node = this._model.nodes[i]
            if (node.id === id) return i
        }
        return -1
    }

    getLinkIndex(source, target) {
        
        for (let i = 0, len = this._model.links.length; i < len; i += 1) {
            let link = this._model.links[i]
            if (link.source === this._model.nodes[source] &&
                link.target === this._model.nodes[target]) {
                return i
            }
        }
        return -1
    }
}
