import './App.css';
import React, { useState } from 'react';

function App() {
  let [data, setData] = useState([]);
  let [type, setType] = useState('');
  let [bool, setBool] = useState(false);

  let Finder = () => {
    if (type.trim() !== '') {
      fetch(`https://pixabay.com/api/?key=8761127-15c354fd40a23de8d*6bfe25d&q=${type}&image_type=photo`)
        .then(res => res.json())
        .then(res => {
          setData(res.hits || []);
          setBool(true)
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      <div className="text-center flex justify-center gap-2">
        <input
          type="text"
          className="bg-green-300 border rounded-l-2xl pl-2 p-1 w-60 md:w-80"
          placeholder="Search for images..."
          onChange={e => setType(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white border rounded-r-2xl p-2 hover:bg-purple-700"
          onClick={Finder}
        >
          Find
        </button>
      </div>

      <div className="mt-4 p-4">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => (
              <div key={index} className="rounded-2xl shadow-lg bg-white p-3">
                <img src={item.webformatURL} alt="Fetched" className="w-full h-40 object-cover rounded-t-2xl" />
                <div className="p-2">
                  <p className="text-purple-600 font-semibold">Photo By {item.user}</p>
                  <p><strong>Views:</strong> {item.views}</p>
                  <p><strong>Downloads:</strong> {item.downloads}</p>
                  <p><strong>Likes:</strong> {item.likes}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          bool && <div className="text-center text-red-500 text-lg">No results found!</div>
        )}
      </div>
    </div>
  );
}

export default App;
