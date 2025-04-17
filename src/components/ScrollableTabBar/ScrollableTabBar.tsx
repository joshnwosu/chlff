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
  const tabContainerRef = useRef<HTMLDivElement>(null);

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
  }, [activeTab]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index, tabs[index].label);
    }
  };

  return (
    <div className={classes.container}>
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
      {tabs[activeTab].content && (
        <div className={classes.content}>{tabs[activeTab].content}</div>
      )}
    </div>
  );
};

export default ScrollableTabBar;
