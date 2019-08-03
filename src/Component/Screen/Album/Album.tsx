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
    return (
      <div>
        {fakeimgs.map((el, idx) => (
          <div>
            <img src={el} alt={el} />
          </div>
        ))}
      </div>
    );
  }
}
