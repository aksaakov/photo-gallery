import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const queryRef = query(collection(projectFirestore, collectionName), orderBy('createdAt', 'desc'));
    const unsub = () => onSnapshot(queryRef, (snapshot) => {
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
      });
      setDocs(documents);
    });
  
    return () => unsub();
  }, [collectionName]);
 
  console.log(docs)
  return { docs }
}

export default useFirestore; 

