import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, query, getDocs } from "firebase/firestore";
import "regenerator-runtime/runtime.js";

const useFirestore = async (collectionRef) => {
  // const [docs, setDocs] = useState([]);
  let documents = [];
  const queryRef = query(collection(projectFirestore, collectionRef));
  const querySnapshot = await getDocs(queryRef);
  querySnapshot.forEach((doc) => {
    documents.push({...doc.data(), id: doc.id});
  });
  console.log(documents)
  return documents;
}

export default useFirestore;