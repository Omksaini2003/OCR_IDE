import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const SnippingTool = () => {
  const [isSnipping, setIsSnipping] = useState(false);
  const [selection, setSelection] = useState(null);
  const [image, setImage] = useState(null);

  const onMouseDown = (e) => {
    if (!isSnipping) return;

    setSelection({
      startX: e.clientX,
      startY: e.clientY,
      width: 0,
      height: 0,
    });
  };

  const onMouseMove = (e) => {
    if (!isSnipping || !selection) return;

    const newSelection = {
      ...selection,
      width: e.clientX - selection.startX,
      height: e.clientY - selection.startY,
    };
    setSelection(newSelection);
  };

  const onMouseUp = () => {
    if (!isSnipping) return;

    const { startX, startY, width, height } = selection;
    setIsSnipping(false);

    if (width && height) {
      html2canvas(document.body, {
        x: startX,
        y: startY,
        width,
        height,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
      }).then((canvas) => {
        setImage(canvas.toDataURL('image/png'));
      });
    }

    setSelection(null);
  };

  const startSnipping = () => {
    setIsSnipping(true);
    document.body.style.cursor = 'crosshair';
  };

  const stopSnipping = () => {
    setIsSnipping(false);
    document.body.style.cursor = 'default';
  };

  return (
    <div>
      <button onClick={startSnipping}>Start Full-Screen Snipping</button>

      {isSnipping && (
        <div
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={stopSnipping}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
            cursor: 'crosshair',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          {selection && (
            <div
              style={{
                position: 'absolute',
                left: selection.startX,
                top: selection.startY,
                width: selection.width,
                height: selection.height,
                border: '2px dashed #000',
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            />
          )}
        </div>
      )}

      {image && (
        <div>
          <h2>Snipped Image:</h2>
          <img src={image} alt="Snipped Screenshot" />
        </div>
      )}
    </div>
  );
};

export default SnippingTool;
