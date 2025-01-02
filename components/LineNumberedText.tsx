// LineNumberedText.tsx
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

interface LineNumberedTextProps {
  text: string;
  // Optional class names for styling
  lineNumberClassName?: string;
  contentClassName?: string;
  containerClassName?: string;
  lineHeightMultiplier?: number; // Fallback multiplier if lineHeight is 'normal'
  debounceDelay?: number; // Debounce delay in milliseconds
}

const LineNumberedText: React.FC<LineNumberedTextProps> = ({
  text,
  lineNumberClassName = 'pr-4 text-right text-foreground',
  contentClassName = 'flex-1 max-w-2/3 leading-6',
  containerClassName = 'flex',
  lineHeightMultiplier = 1.2,
  debounceDelay = 100,
}) => {
  // Split text into paragraphs based on two or more newlines
  const paragraphs = useMemo(() => text.split(/\n{2,}/), [text]);

  // Interleave with empty lines for spacing
  const paragraphsWithSpacing = useMemo(() => {
    const spacedParagraphs: string[] = [];
    paragraphs.forEach((para, index) => {
      spacedParagraphs.push(para);
      if (index < paragraphs.length - 1) {
        spacedParagraphs.push(''); // Insert an empty string to represent a blank line
      }
    });
    return spacedParagraphs;
  }, [paragraphs]);

  // Ref for the container holding all paragraphs
  const containerRef = useRef<HTMLDivElement>(null);

  // State to track line counts for each paragraph and blank line
  const [lineCounts, setLineCounts] = useState<number[]>([]);

  useLayoutEffect(() => {
    const calculateLineNumbers = () => {
      if (!containerRef.current) return;

      // Select all elements corresponding to paragraphs and blank lines
      const paragraphEls = containerRef.current.querySelectorAll(
        '.line-numbered-text-paragraph'
      );

      if (!paragraphEls.length) return;

      // Get the computed style of the first paragraph to determine line-height
      const style = getComputedStyle(paragraphEls[0]);
      let lineHeight = parseFloat(style.lineHeight);

      // Fallback if lineHeight is 'normal' or cannot be parsed
      if (isNaN(lineHeight)) {
        const fontSize = parseFloat(style.fontSize);
        lineHeight = fontSize * lineHeightMultiplier; // Use the provided multiplier
      }

      const tempCounts: number[] = [];

      paragraphEls.forEach((el) => {
        const height = el.getBoundingClientRect().height;
        tempCounts.push(Math.ceil(height / lineHeight));
      });

      // Only update state if the array has actually changed
      setLineCounts((prevCounts) => {
        if (
          prevCounts.length !== tempCounts.length ||
          prevCounts.some((val, i) => val !== tempCounts[i])
        ) {
          return tempCounts;
        }
        return prevCounts;
      });
    };

    // Create a debounced version of calculateLineNumbers using Lodash
    const debouncedCalculate = debounce(calculateLineNumbers, debounceDelay);

    // Add event listener for window resize
    window.addEventListener('resize', debouncedCalculate);

    // Initial calculation
    calculateLineNumbers();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', debouncedCalculate);
      debouncedCalculate.cancel(); // Cancel any pending debounced calls
    };
  }, [paragraphsWithSpacing, debounceDelay, lineHeightMultiplier]);

  return (
    <div className={containerClassName}>
      {/* Line numbers */}
      <div className={lineNumberClassName} aria-hidden='true'>
        {lineCounts.map((count, pIndex) => {
          // Calculate the offset for continuous numbering
          const offset = lineCounts
            .slice(0, pIndex)
            .reduce((acc, curr) => acc + curr, 0);
          return Array.from({ length: count }, (_, i) => (
            <div key={`line-${pIndex}-${i}`} className='leading-6'>
              {offset + i + 1}
            </div>
          ));
        })}
      </div>

      {/* Content */}
      <div ref={containerRef} className={contentClassName}>
        {paragraphsWithSpacing.map((para, index) => (
          <div
            key={`para-${index}`}
            className='line-numbered-text-paragraph leading-6'
          >
            {para.trim() || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineNumberedText;
