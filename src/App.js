import React, { Suspense } from 'react'
import './App.css'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import Earth from './component/earth'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const App = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
}

export default App;
