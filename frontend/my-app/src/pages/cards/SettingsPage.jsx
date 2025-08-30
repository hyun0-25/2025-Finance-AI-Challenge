import React, { useState } from 'react';
import Card from '../../components/cards/Card';
import AddCardButton from '../../components/cards/AddCardButton';
import './SettingsPage.css';

const SettingsPage = () => {
    // 카드 목록 및 폼 상태
    const [cards, setCards] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCard, setNewCard] = useState({});

    // 카드 삭제
    const handleDeleteCard = (id) => {
        setCards(prev => prev.filter(card => card.id !== id));
    };
    // 카드 추가 폼 열기
    const handleAddCard = () => setShowAddForm(true);
    // 카드 추가 폼 닫기
    const handleCancelAddCard = () => {
        setShowAddForm(false);
        setNewCard({});
    };
    // 카드 추가 폼 입력값 변경
    const handleNewCardChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prev => ({ ...prev, [name]: value }));
    };
    // 카드 추가 폼 제출
    const handleSubmitNewCard = (e) => {
        e.preventDefault();
        const cardNumber = [0,1,2,3].map(i => newCard[`cardNumber${i}`] || '').join('');
        if (cardNumber.length !== 16) {
            alert('카드번호 16자리를 모두 입력하세요.');
            return;
        }
        if (!newCard.expiry || !newCard.password || newCard.password.length !== 2) {
            alert('유효기간과 비밀번호 앞 2자리를 입력하세요.');
            return;
        }
        setCards(prev => [...prev, {
            id: Date.now(),
            cardNumber,
            expiry: newCard.expiry,
            password: newCard.password
        }]);
        setNewCard({});
        setShowAddForm(false);
    };

    return (
        <div className="settings-page">
            <div className="page-content">
                <section className="card-management-section">
                    <h3>내 카드 관리</h3>
                    <div className="cards-container">
                        {cards.map(card => (
                            <Card key={card.id} card={card} onDelete={handleDeleteCard} />
                        ))}
                        {!showAddForm ? (
                            <AddCardButton onClick={handleAddCard} />
                        ) : (
                            <div className="card add-card-form">
                                <form onSubmit={handleSubmitNewCard} className="add-card-form-inner">
                                    <div className="add-card-actions">
                                        <button type="button" onClick={handleCancelAddCard} className="cancel-btn small">취소</button>
                                        <button type="submit" className="submit-btn small">추가</button>
                                    </div>
                                    <div className="add-card-fields">
                                        <div className="card-number-group">
                                            {[0,1,2,3].map(i => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    name={`cardNumber${i}`}
                                                    value={newCard[`cardNumber${i}`] || ''}
                                                    onChange={handleNewCardChange}
                                                    maxLength={4}
                                                    required
                                                    className="card-number-input"
                                                    placeholder="0000"
                                                />
                                            ))}
                                        </div>
                                        <div className="card-extra-group">
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={newCard.expiry || ''}
                                                onChange={handleNewCardChange}
                                                maxLength={5}
                                                required
                                                className="card-extra-input"
                                                placeholder="MM/YY"
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                value={newCard.password || ''}
                                                onChange={handleNewCardChange}
                                                maxLength={2}
                                                required
                                                className="card-extra-input"
                                                placeholder="비밀번호 앞 2자리"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SettingsPage;
