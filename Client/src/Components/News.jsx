import React from 'react'

import Fashion from '../assets/QuickBlog-Assets/fashionsale.jpg'
import Free from '../assets/QuickBlog-Assets/19598165.jpg'
import Festive from '../assets/QuickBlog-Assets/15791.jpg'


const dummyNews = [
  {
    id: 1,
    title: "Festive Season Sale is Live!",
    content: "Grab your favorite products with up to 70% off. Limited time offer!",
    image: Festive,
    date: "August 6, 2025"
  },
  {
    id: 2,
    title: "DesiKart Launches New Fashion Line",
    content: "Explore the latest ethnic and western trends now available on DesiKart.",
    image: Fashion,
    date: "August 5, 2025"
  },
  {
    id: 3,
    title: "Free Delivery Weekend!",
    content: "This weekend enjoy free delivery on all orders above ₹499.",
    image: Free,
    date: "August 3, 2025"
  }
];

const News = () => {
  return (
    <div className="bg-primary/10 min-h-screen px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-primary">Latest News</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNews.map(news => (
          <div key={news.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={news.image} alt={news.title} className="h-40 w-full "/>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-primary mb-2">{news.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{news.content}</p>
              <p className="text-xs text-gray-400">Published on {news.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News
