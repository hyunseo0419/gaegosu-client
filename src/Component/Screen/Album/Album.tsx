import React, { Component } from 'react';
import './Album.css';
//import { Pagination } from 'antd';

const fakeimgs = [
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
  'https://pbs.twimg.com/media/DllhBIQXgAEaPdb.jpg',
];

export default class Album extends Component {
  render() {
    const rows: any = chunk(fakeimgs, 3);
    return (
      <div>
        {rows.map((row: any) => (
          <div className="row">
            {row.map((col: any) => (
              <img className="thumb1" src={col} alt={col} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

function chunk(arr: any, size: number) {
  var result = [];
  for (var i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, size + i));
  }

  return result;
}
