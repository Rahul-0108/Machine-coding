import { useEffect, useState } from 'react';

const elementsOverlap = (leftCircle, rightCircle) => {
  // return true if overlap
  const leftCircleRadius = leftCircle.width / 2
  const rightCircleRadius = rightCircle.width / 2
  
  const leftCenter = {
    x: leftCircle.x + leftCircleRadius,
    y: leftCircle.y + leftCircleRadius
  }

  const rightCenter = {
    x: rightCircle.x + rightCircleRadius,
    y: rightCircle.y + rightCircleRadius
  }

  // distance between points (100, 50) (200, 100)
  // (x2 - x1)2 + (y)
  const distanceBetweenCenters = Math.sqrt(
    Math.pow(leftCenter.x - rightCenter.x, 2) + 
    Math.pow(leftCenter.y - rightCenter.y, 2)
  )  

  if(distanceBetweenCenters < leftCircleRadius + rightCircleRadius) {
    return true
  }

  return false;
}

const Circles = () => {
  const [circles, setCircles] = useState([
    {
      id: 'left',
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: 'red'
    }, {
      id: 'right',
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: 'red'
    }
  ])
  const [currentCircleId, setCurrentCircleId] = useState(null);

  const handleContextMenu = e => {
    e.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu)

    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  const handleMouseDown = (e) => {
    const { button } = e;
    const currentId = button === 0 ? 'left' : 'right';

    setCurrentCircleId(currentId)
    setCircles(prev => {
      return prev.map(circle => {
        if (circle.id === currentId) {
          return {
            ...circle,
            startX: e.clientX,
            startY: e.clientY,
            width: 0,
            height: 0,
            x: 0,
            y: 0
          }
        }

        return circle;
      })
    })

  }

  const handleMouseMove = e => {
    if (currentCircleId === null) {
      return
    }

    const updatedCircles = circles.map(circle => {
      if (circle.id === currentCircleId) {
        const distanceX = e.clientX - circle.startX;
        const distanceY = e.clientY - circle.startY;

        const size = Math.max(Math.abs(distanceY), Math.abs(distanceX))

        // x = left margin, y = top margin
        const newX = distanceX < 0 ? circle.startX - size : circle.startX;
        const newY = distanceY < 0 ? circle.startY - size : circle.startY;


        return {
          ...circle,
          width: size,
          height: size,
          x: newX,
          y: newY
        }
      }


      return circle;
    })

    const doCirclesOverlap = elementsOverlap(updatedCircles[0], updatedCircles[1])

    const newCircles = updatedCircles.map(circle => {
      if(circle.id === currentCircleId) {
        return {
          ...circle,
          backgroundColor: doCirclesOverlap ? 'blue' : 'red'
        }
      } 

      return circle;
    })

    setCircles(newCircles)
  }

  const handleMouseUp = e => {
    setCurrentCircleId(null)

  }

  return (<div className="board"
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
  >
    {circles.map(circle => {
      return (
        <div key={circle.id} style={{
          position: 'absolute',
          width: `${circle.width}px`,
          height: `${circle.height}px`,
          left: `${circle.x}px`,
          top: `${circle.y}px`,
          backgroundColor: circle.backgroundColor,
          borderRadius: '50%'
        }} />
      )
    })}
  </div>);
};

export default Circles;
