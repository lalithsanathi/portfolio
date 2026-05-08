import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

export interface TransitionSource {
  projectId: string;
  rect: DOMRect;
}

interface ProjectTransitionCtx {
  capture: (source: TransitionSource) => void;
  peek: () => TransitionSource | null;
  consume: () => TransitionSource | null;
}

const fallback: ProjectTransitionCtx = {
  capture: () => {},
  peek: () => null,
  consume: () => null,
};

const Ctx = createContext<ProjectTransitionCtx>(fallback);

export function ProjectTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<TransitionSource | null>(null);

  const value = useMemo<ProjectTransitionCtx>(
    () => ({
      capture(source) {
        ref.current = source;
      },
      peek() {
        return ref.current;
      },
      consume() {
        const s = ref.current;
        ref.current = null;
        return s;
      },
    }),
    [],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProjectTransition() {
  return useContext(Ctx);
}
