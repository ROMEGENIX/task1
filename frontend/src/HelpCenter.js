import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import SearchBar from './SearchBar';

const HelpCenter = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Help Center</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="card-container">
        {filteredCards.map(card => (
          <Card key={card.title} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
