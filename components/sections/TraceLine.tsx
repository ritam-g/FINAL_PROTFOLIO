interface TraceLineProps {
  /** Labels shown below the trace line, evenly distributed left-to-right */
  nodes: readonly string[];
}

/**
 * The signature animated trace/node element.
 * A thin horizontal line with a glowing green dot that travels across it,
 * plus monospaced node labels below.
 *
 * Used in both Hero and Contact sections with different node arrays.
 */
export default function TraceLine({ nodes }: TraceLineProps) {
  return (
    <div>
      <div className="trace-line" />
      <div className="flex justify-between mt-2">
        {nodes.map((node) => (
          <span key={node} className="node-label">
            {node}
          </span>
        ))}
      </div>
    </div>
  );
}
