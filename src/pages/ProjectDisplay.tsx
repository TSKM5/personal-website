import './../css/pages/project-display.css'
import React, { useState, useEffect } from 'react';
import { Project, TextBlock } from '../utils/types/page-types/ProjectTypes';
import Title from '../components/Title';
import Button from '../components/action-components/Button';
import { MobileIFrame } from '../components/projects-view/MobileIFrame';
import ImageCarousel from '../components/ImageCarousel';
import { WebsocketDemo } from '../components/projects-view/websocket-demo/WebsocketDemo';
import CodeSandbox from '../components/projects-view/CodeSandbox';
import UrlDisplay from '../components/projects-view/UrlDisplay';
import { AnimationDemo } from '../components/projects-view/animation-demo/AnimationDemo';
import { callDownloadApi } from '../services/project-api/FolioApi';

export function ProjectDisplay(props: { project: Project }) {
  const { project } = props;
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newComponents: React.ReactNode[] = project.projectPageContents.map((e, index) => {  
      switch (e.type) {
        case 'codeSandbox':
          return <CodeSandbox key={index} src={e.src}/> 
        case 'downloadAssetButton':
          return <Button key={index} classOverride='project-display-button' text={'Download'} callback={() => {callDownloadApi(e.src)}}/> 
        case 'heading':
          return <Title key={index} text={project.title}/>;
        case 'mobileIFrame':
          return <MobileIFrame key={index} src={e.src}/>;
        case 'imageCarousel':
          return <ImageCarousel key={index} images={e.imagePaths} />
        case 'textContent':
          return <TextDisplay key={index} textBlock={e.textBlock}/>;
        case 'customWsDemo':
          return <WebsocketDemo key={index} src={e.src} />
        case 'urlDisplay':
          return <UrlDisplay key={index} url={e.url} header={e.display} /> 
        case 'animationLibComponent':
          return <AnimationDemo key={index}/> 
        default:
          return null; 
      }
    });

    setComponents(newComponents);
  }, [project.projectPageContents]);

  return <>{components}</>;
}

function TextDisplay(props:{textBlock:TextBlock[]}) {
  const {textBlock} = props;
  return (
    <div className='project-display-container'>
      {
        textBlock.map((t, index) => {
          switch(t.type){
            case 'numberedList':
              return (
                <ol key={index}>
                  {
                    t.value.map((t, listIndex) => (
                      <li key={listIndex}>{t}</li>
                    ))
                  }
                </ol>
              )
            case 'paragraph': 
              return <p key={index}>{t.value}</p>
          }
        })
      }
    </div>
  )
}
