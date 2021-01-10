const checkIfFollowing = async () => {
   const button = document.getElementsByClassName('follow-btn')[0] 
   const res = await fetch(`/feed/follow/${button.id}`)
    const json = await res.json(res)
    
    if(json != null){
       button.innerHTML = 'unfollow'
       button.classList.add('class', 'unfollow')
    } else {
       button.innerHTML = 'follow'
       button.classList.add('class', 'follow')
    }
    
}

document.addEventListener('DOMContentLoaded', async () => {
   checkIfFollowing()
   const button = document.getElementsByClassName('follow-btn')[0]
   button.addEventListener('click', async (event) => {
      const classArr = Array.from(event.target.classList)
      if(classArr.includes('unfollow')){
         const res = await fetch(`/feed/follow/${button.id}/delete`, {
            method: 'DELETE'
         })
         checkIfFollowing()
      } else if (classArr.includes('unfollow')){
         console.log('follow')
      }
   })
   
})