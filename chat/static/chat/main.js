// When the page completely loaded, run the javascript
document.addEventListener('DOMContentLoaded', function(){
    let inpt = document.getElementById('name');

    if (inpt){
        // Disable the submit button first
        document.getElementById('submit').disabled = true;

        // When the user types in the input field, make abled the button
        inpt.addEventListener('keyup', () => {
            if (inpt.value.length > 0){
                document.getElementById('submit').disabled = false;
            }else{
                document.getElementById('submit').disabled = true;
            }
        })
    }

    let title = document.getElementById('chating');

    if (title){
        // Accessing all elements from chating page.
        let message_input = document.querySelector('#message');
        let send_input = document.querySelector('#send');
        let user = document.querySelector('#user_name');
        var container = document.getElementById('message-container');

        // For making an websocket connection, define the url
        const url = `ws://${window.location.host}/ws/chating/`;

        // Create websocket class 
        let socket = new WebSocket(url);

        // When message is send to websocket
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            send_input.disabled = true;

            // Check the name which is saved in input hidden field is the same as received one in websocket. For detecting between current user and others
            if (data.sender == user.value){
                // Create some new elements for messaging
                let text = document.createElement('div');
                let emogi = document.createElement('div');
                emogi.innerHTML = '&#128172;';
                
                // Append it to container div
                container.appendChild(emogi);
                text.innerHTML = data.message;
                text.className = 'my_message';
                emogi.className = 'my_message';
                // do it again
                container.appendChild(text);
                container.appendChild(document.createElement('br'));
            }else {
                // Again creating new elements
                let text = document.createElement('div');
                // Make visable the name of user just. Not the data
                text.innerHTML = `<b>${data.sender.split('/%/')[0]}</b>` + ': ' + data.message;
                text.className = 'others_messages';
                container.appendChild(text);
                container.appendChild(document.createElement('br'));
            }
            // When message is received or sent, check for scrolling the div
            container.scrollTop = container.scrollHeight; 
        }

        // In case of disconnection
        socket.onclose = () => {
            console.error('Online chating closed unexpectedly.');
        }

        send_input.disabled = true;
        message_input.focus();

        // Make disable the send button until the user types message
        message_input.addEventListener('keyup', (e) => {
            if (message_input.value.length > 0){
                send_input.disabled = false;
            }else{
                send_input.disabled = true;
            }

            if (e.keyCode === 13){
                send_input.click();
            }
        })

        // By cliking the send button, send message to the websocket
        send_input.onclick = (e) => {
            const message = message_input.value;
            socket.send(JSON.stringify({
                'message': message,
                'sender': user.value
            }))

            message_input.value = '';
        }
    }
})