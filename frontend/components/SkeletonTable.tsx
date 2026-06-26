export default function SkeletonTable() {
  return (
    <div className="animate-pulse border-t border-border pt-4 space-y-0">
      <div className="h-10 bg-surface-muted rounded-lg mb-3" />
      <div className="h-12 bg-surface-muted/70 rounded-lg mb-2" />
      <div className="h-12 bg-surface-muted/70 rounded-lg mb-2" />
      <div className="h-12 bg-surface-muted/70 rounded-lg mb-2" />
      <div className="h-12 bg-surface-muted/70 rounded-lg" />
    </div>
  );
}
