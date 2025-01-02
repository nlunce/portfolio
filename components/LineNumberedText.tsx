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
  contentClassName = 'flex-1 max-w-2/3',
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
    if (!containerRef.current) return;

    const paragraphEls = containerRef.current.querySelectorAll(
      '.line-numbered-text-paragraph'
    );

    if (!paragraphEls.length) return;

    // Function to calculate line numbers
    const calculateLineNumbers = () => {
      if (!containerRef.current) return;

      const paragraphElements = containerRef.current.querySelectorAll(
        '.line-numbered-text-paragraph'
      );

      if (!paragraphElements.length) return;

      // Get the computed style of the first paragraph to determine line-height
      const style = getComputedStyle(paragraphElements[0]);
      let lineHeight = parseFloat(style.lineHeight);

      // Fallback if lineHeight is 'normal' or cannot be parsed
      if (isNaN(lineHeight)) {
        const fontSize = parseFloat(style.fontSize);
        lineHeight = fontSize * lineHeightMultiplier; // Use the provided multiplier
      }

      const tempCounts: number[] = [];

      paragraphElements.forEach((el) => {
        const height = el.getBoundingClientRect().height;
        // Add a small epsilon to account for sub-pixel rendering differences
        // Use Math.round and ensure at least 1 line per paragraph
        const lines = Math.max(1, Math.round((height + 0.01) / lineHeight));
        tempCounts.push(lines);
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

    // Debounced version of calculateLineNumbers
    const debouncedCalculate = debounce(() => {
      // Use requestAnimationFrame to ensure measurements occur after layout
      requestAnimationFrame(calculateLineNumbers);
    }, debounceDelay);

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      debouncedCalculate();
    });

    // Observe the container for size changes
    resizeObserver.observe(containerRef.current);

    // Initial calculation after ensuring layout is complete
    requestAnimationFrame(calculateLineNumbers);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      debouncedCalculate.cancel(); // Cancel any pending debounced calls
    };
  }, [paragraphsWithSpacing, debounceDelay, lineHeightMultiplier]);

  // Calculate the total number of lines up to each paragraph
  const cumulativeLineCounts = useMemo<number[]>(() => {
    const cumCounts: number[] = [];
    let total = 0;
    for (const count of lineCounts) {
      cumCounts.push(total);
      total += count;
    }
    return cumCounts;
  }, [lineCounts]);

  return (
    <div className={containerClassName}>
      {/* Line numbers */}
      <div
        className={`${lineNumberClassName} whitespace-nowrap`}
        aria-hidden='true'
      >
        {lineCounts.length > 0 &&
          lineCounts.map((count, pIndex) => {
            const offset = cumulativeLineCounts[pIndex];
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
