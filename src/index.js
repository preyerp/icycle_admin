import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';


import InteractionTest from './testBox/InteractionTest';
import ScrollActionTest from './testBox/ScrollActionTest';
import VideoInteractionTest from './testBox/VideoInteractionTest';
import FmotionTest from './testBox/FmotionTest';
import ScrollMoveTest from './testBox/ScrollMoveTest';
import GlitchScroll from './testBox/GlitchScroll';
import ImageUpload from './adminBox/ImageUpload';
import ProjectUpload from './adminBox/ProjectUpload';
import UploadUserData from './adminBox/UploadUserData';
import Login from './adminBox/Login';
import ResultPage from './adminBox/ResultPage';
import MainImageUpload from './adminBox/MainImageUpload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path="upload" element={<ProjectUpload />}></Route>
      <Route path="main_image_upload" element={<MainImageUpload />}></Route>
      <Route path="result" element={<ResultPage />}></Route>
    </Routes>
  </BrowserRouter>

  // <React.StrictMode>

  //   {/* <InteractionTest></InteractionTest> */}
  //   {/* <ScrollActionTest></ScrollActionTest> */}
  //   {/* <VideoInteractionTest></VideoInteractionTest> */}
  //   {/* <FmotionTest></FmotionTest> */}
  //   {/* <ImageUpload></ImageUpload> */}
  //   {/* <ProjectUpload></ProjectUpload> */}
  //   <UploadUserData></UploadUserData>
  //   {/* <ScrollMoveTest></ScrollMoveTest> */}
  //   {/* <GlitchScroll></GlitchScroll> */}
  // </React.StrictMode>
);

