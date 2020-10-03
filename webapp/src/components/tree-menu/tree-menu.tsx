import React, { useState, useEffect } from 'react';
import { usePrevious, useMeasure } from 'utils/hooks';
import { useSpring, animated } from 'react-spring';
import { Frame, Title, Content, Header, IconWrapper } from './tree-menu.style';
import { Button } from 'components/button/button';
import { ArrowNext } from 'assets/icons/ArrowNext';

import * as Icons from 'assets/icons/category-icons';
const Tree = React.memo(
  ({
    children,
    name,
    icon,
    // isOpen,
    onClick,
    dropdown,
    onToggleBtnClick,
    depth,
    defaultOpen = false,
  }: any) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    useEffect(() => {
      setOpen(defaultOpen);
    }, [defaultOpen]);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring<any>({
      from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
      },
    });
    // const Icon = icon ? Icons[icon] : depth === 'child' ? Icons['Minus'] : null;
    const Icon = icon ? Icons[icon] : null;
    return (
      <Frame depth={depth}>
        <Header open={isOpen} depth={depth} className={depth}>
          {Icon !== null && (
            <IconWrapper depth={depth}>
              <Icon />
            </IconWrapper>
          )}
          <Title onClick={onClick}>{name}</Title>

          {dropdown === true && (
            <Button
              onClick={() => setOpen(!isOpen)}
              variant='text'
              className='toggleButton'
            >
              <ArrowNext width='16px' />
            </Button>
          )}
        </Header>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}
        >
          <animated.div style={{ transform }} {...bind} children={children} />
        </Content>
      </Frame>
    );
  }
);

type Props = {
  className?: any;
  data: any;
  onClick: (slug: string) => void;
  active: string | string[];
};
export const TreeMenu: React.FC<Props> = ({
  data,
  className,
  onClick,
  active,
}) => {
  const handler = (children) => {
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <Tree
            key={subOption.title}
            name={subOption.title}
            icon={subOption.icon}
            depth='child'
            onClick={() => onClick(subOption.slug)}
            defaultOpen={active === subOption.slug}
          />
        );
      }
      return (
        <Tree
          key={subOption.title}
          name={subOption.title}
          icon={subOption.icon}
          dropdown={!subOption.children.length ? false : true}
          depth='parent'
          onClick={() => onClick(subOption.slug)}
          defaultOpen={
            active === subOption.slug ||
            subOption.children.some((item) => item.slug === active)
          }
        >
          {handler(subOption.children)}
        </Tree>
      );
    });
  };
  return <>{handler(data)}</>;
};
