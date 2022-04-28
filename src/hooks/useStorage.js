import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, Timestamp, ref, getDownloadURL, uploadBytesResumable  } from '../firebase/config';
import { setDoc, doc } from "firebase/firestore";
import "regenerator-runtime/runtime.js";
import { v4 as generateId } from 'uuid';

const useStorage = (file, collectionName) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const id = generateId();
  
  useEffect(() => {
    
    const storageRef = ref(projectStorage, `${collectionName}/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(uploadProgress)
      setProgress(uploadProgress)
    }, 
    (error) => {
      console.log('failed to upload: ', error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('got here', Timestamp.now(), downloadURL)
        const docRef = doc(projectFirestore, `${collectionName}`, id);
        setDoc(docRef, {
          url: downloadURL,
          fileName: file.name,
          createdAt: Timestamp.now()
        });
        setUrl(downloadURL);
      });
    })
  }, [file, collectionName]);

  return { progress, url }
}

export default useStorage;