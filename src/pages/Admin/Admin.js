import React, { useState } from 'react';
import { ref, set, get, update, remove } from 'firebase/database';
import { database } from '../../config/firebaseConfig';
import './Admin.css';

const Admin = () => {
  const [enterName, setEnterName] = useState('');
  const [enterLongitude, setEnterLongitude] = useState('');
  const [enterLatitude, setEnterLatitude] = useState('');
  const [enterImageLink, setEnterImageLink] = useState('');
  const [enterComment, setEnterComment] = useState('');
  const [findName, setFindName] = useState('');
  const [findResults, setFindResults] = useState({
    name: '',
    longitude: '',
    latitude: '',
    imageLink: '',
    comment: ''
  });

  const insertData = () => {
    set(ref(database, "Locations/" + enterName), {
      Longitude: enterLongitude,
      Latitude: enterLatitude,
      ImageLink: enterImageLink,
      Comment: enterComment
    })
    .then(() => {
      alert("Data added successfully");
    })
    .catch((error) => {
      alert(error);
    });
  };

  const findData = () => {
    const query = ref(database, "Locations/");
    get(query)
    .then((snapshot) => {
      const locations = snapshot.val();
      let results = [];
      for (const locationName in locations) {
        if (new RegExp(findName, "i").test(locationName)) {
          results.push({
            name: locationName,
            longitude: locations[locationName].Longitude,
            latitude: locations[locationName].Latitude,
            imageLink: locations[locationName].ImageLink,
            comment: locations[locationName].Comment,
          });
        }
      }

      if (results.length) {
        const result = results[0];
        setFindResults({
          name: result.name,
          longitude: result.longitude,
          latitude: result.latitude,
          imageLink: result.imageLink,
          comment: result.comment
        });
      } else {
        alert("No data found matching the search term.");
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  const updateData = () => {
    update(ref(database, "Locations/" + enterName), {
      Longitude: enterLongitude,
      Latitude: enterLatitude,
      ImageLink: enterImageLink,
      Comment: enterComment
    })
    .then(() => {
      alert("Data updated successfully");
    })
    .catch((error) => {
      alert(error);
    });
  };

  const removeData = () => {
    remove(ref(database, "Locations/" + enterName))
    .then(() => {
      alert("Data deleted successfully");
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <div>
      <div id="enterDetails">
        <h1>Enter details</h1>
        <h4>Name</h4>
        <input id="enterName" type="text" value={enterName} onChange={(e) => setEnterName(e.target.value)} />
        <h4>Longitude</h4>
        <input id="enterLongitude" type="text" value={enterLongitude} onChange={(e) => setEnterLongitude(e.target.value)} />
        <h4>Latitude</h4>
        <input id="enterLatitude" type="text" value={enterLatitude} onChange={(e) => setEnterLatitude(e.target.value)} />
        <h4>Image Link</h4>
        <input id="enterImageLink" type="text" value={enterImageLink} onChange={(e) => setEnterImageLink(e.target.value)} />
        <h4>Comment</h4>
        <input id="enterComment" type="text" value={enterComment} onChange={(e) => setEnterComment(e.target.value)} /> <br /><br />
        <button id="insert" onClick={insertData}>INSERT</button>
        <button id="update" onClick={updateData}>UPDATE</button>
        <button id="remove" onClick={removeData}>REMOVE</button> <br /><br />
      </div>

      <div id="findDetails">
        <h1>Search:</h1>
        <h4>Name</h4>
        <input id="findName" type="text" value={findName} onChange={(e) => setFindName(e.target.value)} /> <br /><br />
        <button id="find" onClick={findData}>FIND</button>
        <h3 id="findNameResult">Name: {findResults.name}</h3>
        <h3 id="findLongitude">Longitude: {findResults.longitude}</h3>
        <h3 id="findLatitude">Latitude: {findResults.latitude}</h3>
        <h3 id="findImageLink">Image Link: {findResults.imageLink}</h3>
        <h3 id="findComment">Comment: {findResults.comment}</h3> <br /><br />
      </div>
    </div>
  );
};

export default Admin;
