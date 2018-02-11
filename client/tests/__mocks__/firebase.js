
  export const storage = () =>{
    return {  
      ref(url) {
        return {
          putString: jest.fn((message, data) => Promise.resolve({
            snapshot: {
              downloadURL: ''
            }
          }))
        }
      }
    }
  }

  export const initializeApp = (config) =>{
    return true 
  }