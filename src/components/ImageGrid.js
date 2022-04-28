import React, { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Slide from '@mui/material/Slide';

const ImageGrid = ({ setSelectedImg }) => {
  const [imageSet, setImageSet] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let docs;
    const fetchData = async () => {
      docs = await useFirestore('images');
      setImageSet(docs);
      setIsLoading(false);
    }
    
    fetchData();
  }, []);
  
  const renderImage = (item) => {
    return (
      <ImageListItem key={item.src} onClick={() => setSelectedImg(item.src)}>
        <img
          src={`${item.url}?w=248&fit=crop&auto=format`}
          srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={'not found'}
        />
      </ImageListItem>
    )
  }
  
  return (
    isLoading ? <div> Loading...</div> : 

    // <Box>

    <Slide direction="up" in={!isLoading} timeout={1000}>
    <ImageList variant="masonry" cols={3} gap={8}>
    {imageSet.map((item) => (
      renderImage(item)
    ))}
    </ImageList>

    </Slide>
  // </Box>
    

    // <div className="img-grid">
    //   {docs && docs.map(doc => (
    //     <div className="img-wrap" key={doc.id} 
    //       layout
    //       whileHover={{ opacity: 1 }}s
    //       onClick={() => setSelectedImg(doc.url)}
    //     >
    //       <img src={doc.url} alt="uploaded pic"/>
    //     </div>
    //   ))}
    // </div>
  )
}

export default ImageGrid;
