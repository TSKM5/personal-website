import './../css/pages/project-page.css'
import React, { useState, useEffect, useContext } from 'react';
import Button from '../components/action-components/Button';
import { MobileIFrame } from '../components/projects-view/MobileIFrame';
import ImageCarousel from '../components/image-carousel/ImageCarousel';
import { WebsocketDemo } from '../components/projects-view/websocket-demo/WebsocketDemo';
import CodeSandbox from '../components/projects-view/CodeSandbox';
import UrlDisplay from '../components/projects-view/UrlDisplay';
import { AnimationDemo } from '../components/projects-view/animation-demo/AnimationDemo';
import { callDownloadApi } from '../services/project-api/FolioApi';
import { CmsDataContext } from '../services/context/DataServiceContext';
import MarkDownContent from '../components/projects-view/MarkdownContent';
import { ProjectDetails, ProjectPageContents, ProjectTypeConstants } from '../utils/types/CoreTypesMapping';
import InlineMessage from '../components/InlineMessage';
import LoadingSpinner from '../components/LoadingSpinner';

export function ProjectPage(props: { project: ProjectDetails }) {
  const { project } = props;
  const projectContext = useContext(CmsDataContext);
  const content = projectContext?.getProjectPageContent(project._id);
  const [projectContents, setProjectContents] = useState<ProjectPageContents[]>([]);
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
      if (content && !content.isLoading && !content.isError) {
        setProjectContents(content.data ?? []);
      }
  }, [content]);

  useEffect(() => {
    setComponents([...createComponents(projectContents)]);
  }, [projectContents]);


  if(content && content.isError) return <InlineMessage text="Error loading content." />;
  if(content && content.isLoading) return <LoadingSpinner />;
  return <>{components}</>;
}

function createComponents(projectContents: ProjectPageContents[]): React.ReactNode[] {
  return projectContents.map((e, index) => {
    switch (e.type) {
      case ProjectTypeConstants.codeSandbox:
        return <CodeSandbox key={index} src={e.src} />;
      case ProjectTypeConstants.downloadAssetButton:
        return <Button key={index} classOverride='project-display-button' text={'Download'} callback={() => { callDownloadApi(e.src) }} />;
      case ProjectTypeConstants.mobileIFrame:
        return <MobileIFrame key={index} src={e.src} />;
      case ProjectTypeConstants.imageCarousel:
        return <ImageCarousel key={index} images={e.imagePaths} />;
      case ProjectTypeConstants.customWsDemo:
        return <WebsocketDemo key={index} src={e.src} />;
      case ProjectTypeConstants.urlDisplay:
        return <UrlDisplay key={index} url={e.url} header={e.display} />;
      case ProjectTypeConstants.animationLibComponent:
        return <AnimationDemo key={index} />;
      case ProjectTypeConstants.markdownBlock:
        return <MarkDownContent key={index} code={e.code} />;
      default:
        return null;
    }
  })
}
