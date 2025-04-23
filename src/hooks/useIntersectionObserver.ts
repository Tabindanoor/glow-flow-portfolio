
import { useEffect } from 'react';

interface IntersectionObserverProps {
  target: React.RefObject<Element>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0,
  rootMargin = "0px"
}: IntersectionObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const element = target.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [target, onIntersect, threshold, rootMargin]);
};

export default useIntersectionObserver;
