import { Box } from "@mui/material";
import FreeSolo from "../../shared/search/Search";
import RecentProducts from "../../shared/recentPoducts/RecentProducts";
import ProductServiceAPI, { Product } from "../../backendApi/productServiceApi";
import { useEffect, useState } from "react";
// import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
// import { OBJLoader } from "three/examples/jsm/Addons.js";

function Home() {
  const [products, setProducts] = useState(Array<Product>);
  const productApi = ProductServiceAPI.getInstance("https://127.0.0.1:443");

  useEffect(() => {
    productApi
      .getRecentProducts()
      .then((resp) => {
        setProducts(resp.products);
        // console.log(new Date(resp.products[0].createdAt).toLocaleDateString());
        // console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box width="100%" height="100vh">
      <FreeSolo products={products} />
      <Box sx={{ pt: 3, px: 2, width: "90%" }}>
        <RecentProducts products={products} />
      </Box>
    </Box>
  );
}

export default Home;

// function Can() {
//   const obj = useLoader(OBJLoader, "./vaccum.obj");

//   return (
//     <Canvas>
//       <ambientLight intensity={Math.PI / 2} />
//       <spotLight
//         position={[10, 10, 10]}
//         angle={0.15}
//         penumbra={1}
//         decay={0}
//         intensity={Math.PI}
//       />
//       <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//       <Box1 position={[-1, -1, -70]} obj={obj} />
//       <Box2 position={[-2, -2, -70]} obj={obj} />
//     </Canvas>
//   );
// }

// function Box1({ obj, ...props }: ThreeElements["mesh"] & { obj: any }) {
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);

//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={0.5}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <primitive object={obj} />
//     </mesh>
//   );
// }

// function Box2({ obj, ...props }: ThreeElements["mesh"] & { obj: any }) {
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);

//   useFrame((state, delta) => (meshRef.current.rotation.x += delta * 0.01));

//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={0.5}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <primitive object={obj} />
//     </mesh>
//   );
// }
