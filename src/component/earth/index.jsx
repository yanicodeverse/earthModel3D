import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

//images
import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg'
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg'

const Earth = (props) => {

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap,EarthSpecularMap,EarthCloudsMap])

    const earthRef = useRef()
    const cloudsRef = useRef()

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime()

        earthRef.current.rotation.y = elapsedTime / 10
        cloudsRef.current.rotation.y = elapsedTime / 10
    })

    return (
        <>
            {/* <ambientLight intensity={1} /> */}
            <pointLight
                color='#f8f5e6'
                position={[2,0,2]}
                intensity={1.5}
            />
            <Stars
                radius={200}
                depth={60}
                count={20000}
                factor={6}
                fade={true}
            />
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.002,30,30]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh ref={earthRef}>
                <sphereGeometry args={[1,30,30]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.6} />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                />
            </mesh>  
        </>
    )
}

export default Earth