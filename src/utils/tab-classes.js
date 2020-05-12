import clsx from 'clsx';

export const tabsClasses = clsx(['mx-2', 'my-4']);
export const tabListClasses = clsx(['flex']);
export const tabClasses = (isLast) =>
  clsx({
    'flex-1': true,
    'mr-2': !isLast,
  });

export const tabContentClasses = (isActive) =>
  clsx(
    [
      'text-center',
      'block',
      'border',
      'border-gray-200',
      'rounded-sm',
      'py-2',
      'px-4',
      'bg-gray-200',
      'hover:bg-blue-200',
      'hover:text-blue-700',
      'cursor-pointer',
    ],
    {
      'bg-gray-200': !isActive,
      'border-gray-200': !isActive,
      'bg-blue-200': isActive,
      'border-blue-200': isActive,
      'text-blue-700': isActive,
    },
  );
