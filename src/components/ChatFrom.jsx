
function ChatForm({message,handleChange,handleSubmit}) {
  
  // console.log(messages)
  return (
    <>
        <form onSubmit={handleSubmit}>
          <input type='text' value={message} onChange={handleChange} style={{MaxWidth:"500px",margin:"auto",width:"100%"}} />
          <button type="submit">
            send
          </button>
        </form>
    </>
  )
}

export default ChatForm
