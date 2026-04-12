import React from 'react';

type ThreeColProps = {
  mode: 'three-col';
  left: React.ReactNode;
  main: React.ReactNode;
  right: React.ReactNode;
};

type LeftMainProps = {
  mode: 'left-main';
  left: React.ReactNode;
  main: React.ReactNode;
  right?: never;
};

type MainRightProps = {
  mode: 'main-right';
  left?: never;
  main: React.ReactNode;
  right: React.ReactNode;
};

type PageLayoutProps = ThreeColProps | LeftMainProps | MainRightProps;

export function PageLayout(props: PageLayoutProps) {
  const { mode, left, main, right } = props;
  
  if (mode === 'three-col') {
    // 3 / 6 / 3
    return (
      <main className="w-full px-6 lg:px-12 py-8 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          <div className="lg:col-span-3 flex flex-col gap-6">
            {left}
          </div>
          <div className="lg:col-span-6 flex flex-col gap-8">
            {main}
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6">
            {right}
          </div>
        </div>
      </main>
    );
  }

  if (mode === 'left-main') {
    // 4 / 8
    return (
      <main className="w-full px-6 lg:px-12 py-8 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          <div className="lg:col-span-4 flex flex-col gap-6">
            {left}
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8 w-full min-w-[60%]">
            {main}
          </div>
        </div>
      </main>
    );
  }

  if (mode === 'main-right') {
    // 8 / 4
    return (
      <main className="w-full px-6 lg:px-12 py-8 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          <div className="lg:col-span-8 flex flex-col gap-8 w-full min-w-[60%]">
            {main}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            {right}
          </div>
        </div>
      </main>
    );
  }

  return null;
}
