import React, { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState(initialFriends);

  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar
          friends={friends}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
        {showAddFriend && (
          <FormAddFriend friends={friends} setFriends={setFriends} />
        )}
        <button
          className="button"
          onClick={() => setShowAddFriend(!showAddFriend)}
        >
          {showAddFriend ? "Close" : "Add Friend"}
        </button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          friends={friends}
          setFriends={setFriends}
        />
      )}
    </div>
  );
}
function Sidebar({ friends, selectedFriend, setSelectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Person
          friend={friend}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
      ))}
    </ul>
  );
}

function Person({ friend, selectedFriend, setSelectedFriend }) {
  const isSelected = (selectedFriend ? selectedFriend.id : null) === friend.id;
  function handleSelect() {
    if (isSelected) {
      setSelectedFriend(null);
      return;
    }
    setSelectedFriend(friend);
  }
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image}></img>
      <h3>{friend.name}</h3>
      {friend.balance === 0 ? (
        <p>You and {friend.name} are even</p>
      ) : friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      ) : (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}

      <button className="button" onClick={handleSelect}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FormAddFriend({ friends, setFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    setFriends([...friends, newFriend]);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <button className="button">Add</button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, setSelectedFriend, friends, setFriends }) {
  const [bill, setBill] = useState(null);
  const [yourExpense, setYourExpense] = useState(null);
  const friendExpenses = bill - yourExpense;
  const [paying, setPaying] = useState("user");

  function handleSplit(e) {
    e.preventDefault();
    if (!bill || !yourExpense || !paying) return;
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? paying === "user"
            ? { ...friend, balance: Number(bill - yourExpense) }
            : { ...friend, balance: Number(bill - friendExpenses) * -1 }
          : friend
      )
    );
    setSelectedFriend(null)
  }
  return (
    <form className="form-split-bill" onSubmit={handleSplit}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💰Bill value</label>
      <input
        type="text"
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🧍‍♂️Your expenses</label>
      <input
        type="text"
        onChange={(e) => setYourExpense(Number(e.target.value))}
      ></input>

      <label>🧍{selectedFriend.name} expenses</label>
      <input
        type="text"
        disabled
        value={friendExpenses > 0 ? friendExpenses : ""}
      />

      <label>🤑Who is paying the bill?</label>
      <select onChange={(e) => setPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <button className="button" onClick={handleSplit}>
        Split bill
      </button>
    </form>
  );
}
