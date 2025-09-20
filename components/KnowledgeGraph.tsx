
import React, { useEffect, useRef } from 'react';
import type { KnowledgeGraphData, KnowledgeGraphNode, KnowledgeGraphLink } from '../types';

declare const d3: any;

interface KnowledgeGraphProps {
  data: KnowledgeGraphData;
}

const groupColors: { [key: string]: string } = {
  person: '#22d3ee', // cyan
  organization: '#a78bfa', // violet
  location: '#facc15', // yellow
  default: '#64748b' // slate
};


const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !data.nodes || !svgRef.current) return;

    const { nodes, links } = data;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svg.node().getBoundingClientRect().width;
    const height = 400;

    svg.attr("height", height);

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const linkLabel = svg.append("g")
        .selectAll(".linkLabel")
        .data(links)
        .join("text")
        .attr("class", "linkLabel")
        .attr("fill", "#64748b")
        .style("font-size", "10px")
        .text((d: any) => d.relationship);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    node.append("circle")
        .attr("r", 8)
        .attr("fill", (d: any) => groupColors[d.group] || groupColors.default)
        .attr("stroke", "#1e293b")
        .attr("stroke-width", 2);

    node.append("text")
        .attr("x", 12)
        .attr("y", "0.31em")
        .text((d: any) => d.id)
        .attr("fill", "#e2e8f0")
        .style("font-size", "12px");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      
      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [data]);

  if (!data || !data.nodes || data.nodes.length === 0) {
    return <p className="text-slate-400">No relationship data available for this article.</p>;
  }

  return (
    <div>
        <div className="flex flex-wrap gap-4 mb-4">
            {Object.entries(groupColors).map(([group, color]) => 
                group !== 'default' && (
                <div key={group} className="flex items-center">
                    <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                    <span className="text-sm capitalize text-slate-400">{group}</span>
                </div>
                )
            )}
        </div>
        <svg ref={svgRef} className="w-full h-[400px]"></svg>
    </div>
    
  );
};

export default KnowledgeGraph;
