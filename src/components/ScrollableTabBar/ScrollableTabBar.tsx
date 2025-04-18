// import { useEffect, useRef, useState } from 'react';
// import classes from './ScrollableTabBar.module.css';

// interface Tab {
//   label: string;
//   content?: React.ReactNode;
// }

// interface ScrollableTabBarProps {
//   tabs: Tab[];
//   defaultActiveTab?: string | number;
//   onTabChange?: (index: number, label: string) => void;
// }

// const ScrollableTabBar: React.FC<ScrollableTabBarProps> = ({
//   tabs,
//   defaultActiveTab = 0,
//   onTabChange,
// }) => {
//   const getInitialActiveTab = (): number => {
//     if (defaultActiveTab === undefined) return 0;
//     if (typeof defaultActiveTab === 'number') {
//       return defaultActiveTab >= 0 && defaultActiveTab < tabs.length
//         ? defaultActiveTab
//         : 0;
//     }
//     const index = tabs.findIndex((tab) => tab.label === defaultActiveTab);
//     return index !== -1 ? index : 0;
//   };

//   const [activeTab, setActiveTab] = useState(getInitialActiveTab());
//   const tabContainerRef = useRef<HTMLDivElement>(null);

//   // Scroll to center the active tab
//   useEffect(() => {
//     const container = tabContainerRef.current;
//     const activeTabElement = container?.children[activeTab];
//     if (activeTabElement && container) {
//       setTimeout(() => {
//         const containerRect = container.getBoundingClientRect();
//         const tabRect = activeTabElement.getBoundingClientRect();
//         const scrollPosition =
//           tabRect.left +
//           container.scrollLeft -
//           containerRect.left -
//           (containerRect.width - tabRect.width) / 2;

//         container.scrollTo({
//           left: Math.max(0, scrollPosition),
//           behavior: 'smooth',
//         });
//       }, 50);
//     }
//   }, [activeTab]);

//   const handleTabChange = (index: number) => {
//     setActiveTab(index);
//     if (onTabChange) {
//       onTabChange(index, tabs[index].label);
//     }
//   };

//   return (
//     <div className={classes.container}>
//       <div ref={tabContainerRef} className={classes.tabContainer}>
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`${classes.tab} ${
//               activeTab === index ? classes.activeTab : ''
//             }`}
//             onClick={() => handleTabChange(index)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       {tabs[activeTab].content && (
//         <div className={classes.content}>{tabs[activeTab].content}</div>
//       )}
//     </div>
//   );
// };

// export default ScrollableTabBar;

import { useEffect, useRef, useState } from 'react';
import classes from './ScrollableTabBar.module.css';

interface Tab {
  label: string;
  content?: React.ReactNode;
}

interface ScrollableTabBarProps {
  tabs: Tab[];
  defaultActiveTab?: string | number;
  onTabChange?: (index: number, label: string) => void;
}

const ScrollableTabBar: React.FC<ScrollableTabBarProps> = ({
  tabs,
  defaultActiveTab = 0,
  onTabChange,
}) => {
  const getInitialActiveTab = (): number => {
    if (defaultActiveTab === undefined) return 0;
    if (typeof defaultActiveTab === 'number') {
      return defaultActiveTab >= 0 && defaultActiveTab < tabs.length
        ? defaultActiveTab
        : 0;
    }
    const index = tabs.findIndex((tab) => tab.label === defaultActiveTab);
    return index !== -1 ? index : 0;
  };

  const [activeTab, setActiveTab] = useState(getInitialActiveTab());
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // Update arrow visibility based on scroll position
  const updateArrowVisibility = () => {
    const container = tabContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
    }
  };

  // Scroll to center the active tab
  useEffect(() => {
    const container = tabContainerRef.current;
    const activeTabElement = container?.children[activeTab];
    if (activeTabElement && container) {
      setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        const scrollPosition =
          tabRect.left +
          container.scrollLeft -
          containerRect.left -
          (containerRect.width - tabRect.width) / 2;

        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }, 50);
    }
    updateArrowVisibility();
  }, [activeTab]);

  // Add scroll event listener to update arrow visibility
  useEffect(() => {
    const container = tabContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrowVisibility);
      updateArrowVisibility(); // Initial check
      return () =>
        container.removeEventListener('scroll', updateArrowVisibility);
    }
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index].label);
    }
  };

  const scrollLeft = () => {
    const container = tabContainerRef.current;
    if (container) {
      container.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = tabContainerRef.current;
    if (container) {
      container.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.tabWrapper}>
        {showLeftArrow && (
          <button className={classes.arrowLeft} onClick={scrollLeft}>
            <svg
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z' />
            </svg>
          </button>
        )}
        <div ref={tabContainerRef} className={classes.tabContainer}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${classes.tab} ${
                activeTab === index ? classes.activeTab : ''
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {showRightArrow && (
          <button className={classes.arrowRight} onClick={scrollRight}>
            <svg
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z' />
            </svg>
          </button>
        )}
      </div>
      {tabs[activeTab].content && (
        <div className={classes.content}>{tabs[activeTab].content}</div>
      )}
    </div>
  );
};

export default ScrollableTabBar;
