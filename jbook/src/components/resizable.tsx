import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  // Handling ResizeObserver loop error
  useEffect(() => {
    const resizeErrorListener = (e: ErrorEvent) => {
      //   prettier-ignore
      if (e.message ==="ResizeObserver loop completed with undelivered notifications.") {
              const resizeObserverErrDiv = document.getElementById("webpack-dev-server-client-overlay-div");
              const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
              if (resizeObserverErr) {
                resizeObserverErr.setAttribute("style", "display: none");
              }
              if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute("style", "display: none");
              }
            }
    };
    window.addEventListener("error", resizeErrorListener);
 
    return () => window.removeEventListener("error", resizeErrorListener);
  }, []);


  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;