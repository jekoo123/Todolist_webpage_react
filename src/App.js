import "./App.css";
import React, { useState, useRef } from "react";
import { Dialog } from "@material-ui/core";
function App() {
  let txt = useRef(null); //현재 input에 입력된 값을 가져오기 위해
  let date = useRef(null);
  let update_txt = useRef(null);
  let update_date = useRef(null);
  let index_list = [];
  let [object, setObject] = useState([]);
  let [open, setOpen] = useState(false);
  let [up,setUp]=useState(0);

  
  const input = () => {
    let temp = new Date(date.current.value);
    setObject([
      ...object,
      [temp.getFullYear(), temp.getMonth(), temp.getDate(), txt.current.value],
    ]);
    txt.current.value = "";
    date.current.value = "";
  };
  const storage = (index) => {
    console.log(index);
    if (index_list.includes(index)) {
      index_list = index_list.filter((lu) => lu !== index);
    } else {
      index_list.push(index);
    }
    console.log(index_list);
  };
  const del = () => {
    setObject(object.filter((e, i) => !index_list.includes(i)));
  };

  const update = (key) => {
    console.log(key);
    let temp = new Date(update_date.current.value);
    let updatedObject = [...object];
    updatedObject[key] = [
      temp.getFullYear(),
      temp.getMonth(),
      temp.getDate(),
      update_txt.current.value,
    ];
    setObject(updatedObject);
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="tl_container">
        <div className="title">Todolist</div>
        <div className="inputbox">
          <input type="date" className="date_input" ref={date} />
          <input
            type="text"
            className="text_input"
            ref={txt}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                input();
              }
            }}
          />
          <button className="add_button" onClick={input}>
            Add
          </button>
          <button className="del_button" onClick={del}>
            Del
          </button>
        </div>
        <div className="Todolist">
          <div className="list_title">
            <span className="blank"></span>
            <span className="list_title_date">Date</span>
            <span className="list_title_content">Content</span>
          </div>
          {object.map((a, i) => {
            return (
              <div className="content" key={i}>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => {
                    storage(i);
                  }}
                />
                <div className="date_content">
                  {a[0]}년{a[1] + 1}월{a[2]}일
                </div>
                <div className="text_content">{a[3]}</div>
                <button className="update_button" onClick={() => {setUp(i); setOpen(true); console.log(up)}}>
                  U
                </button>
              </div>
            );
            // return <Content key={a.id} element={a} id={a.id} />;
          })}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div>
          <input type="date" className="date_input" ref={update_date} />
          <input
            type="text"
            className="text_input"
            ref={update_txt}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(up);
                update(up);
              }
            }}
          />
          <button onClick={()=>{update(up)}}>
            확인
          </button>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </button>
        </div>
      </Dialog>
    </div>
  );
}
//onclick등의 속성에 넣을때에는 화살표 함수가 좋지만 태그 사이에 넣을때에는 그냥 함수가 좋은거 같다.
export default App;

/* <button
          className="update_button"
          onClick={() => {
            setOpen(true);
          }}
        >
          U
        </button>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div>
            <input type="date" className="date_input" ref={update_date} />
            <input
              type="text"
              className="text_input"
              ref={update_txt}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  update(i);
                }
              }}
            />
            <button
              onClick={() => {
                setOpen(false);
                console.log(i);
              }}
            >
              취소
            </button>
          </div>
        </Dialog> */
