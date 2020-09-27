window.addEventListener('load', start)

var globalNames = [1, 2, 3, 4]
var inputName = null
var currentIndex = null
var isEditing = false

function start() {
  inputName = document.querySelector('#nomeInput')
  preventFormSubmit()
  activateInput()
  render()
}

function preventFormSubmit() {
  var form = document.querySelector('form')

  form.addEventListener('submit', handleFormSubmit)

  function handleFormSubmit(e) {
    e.preventDefault()
  }
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName)
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName
  }

  function handleTyping(e) {
    if (e.key === 'Enter') {
      if (isEditing) {
        updateName(e.target.value)
      } else { 
        insertName(e.target.value) 
      }
      isEditing = false
      clearInput()
      render()
    }
  }

  inputName.addEventListener('keyup', handleTyping)
  inputName.focus()
}

function render() {
  function createDelButton(index) {
    function deleteName() {
      globalNames.splice(index, 1)
      render()
    }    
    var delButton = document.createElement('button')
    delButton.textContent = 'x'
    delButton.addEventListener('click', deleteName)
    return delButton
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name
      inputName.focus()
      isEditing = true
      currentIndex = index
    }
    var span = document.createElement('span')
    span.textContent = name
    span.addEventListener('click', editItem)
    return span
  }

  var divNames = document.querySelector('#names')
  divNames.innerHTML = ''

  var ul = document.createElement('ul')
  
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i]

    var li = document.createElement('li')
    var delButton = createDelButton(i)
    var span = createSpan(currentName, i)

    li.appendChild(delButton)
    li.appendChild(span)
    ul.appendChild(li)
  }

  divNames.appendChild(ul)

  clearInput()
}

function clearInput() {
  inputName.value = ''
  inputName.focus()
}