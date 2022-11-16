import { useState } from 'react';

type ListProps = {
    initialItems : string[]
}
function List( {initialItems} : ListProps) {
  const [newItem, setNewItem] = useState('')
  const [list, setList] = useState(initialItems);

  function addToList(){
    setList(state => [...state, newItem]);
    setNewItem('')
  }
  function secondAddToList(){
    setTimeout(()=> {
      setList(state => [...state, newItem]);
    }, 500)
  }
  function removeFromList(iten: string) {
    setTimeout(()=> {
      setList(state => state.filter(item => item !== iten));
      setNewItem('')
    }, 500)
  }

  return (
    <>
      <input placeholder='novo item' value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addToList}>Adicionar</button>
      <button onClick={secondAddToList}>Adicionar2</button>
      <ul>
        {list.map(item => (
        <li key={item}>
          {item}
          <button onClick={() => removeFromList(item)}>Remover</button>
        </li>
        ))}
      </ul>
    </>
  )
}

export default List