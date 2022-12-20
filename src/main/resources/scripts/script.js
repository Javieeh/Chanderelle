//Load items from server
function loadItems(callback) {

    console.log("loadItems");

    //TODO Make GET request to load items. When request
    //returns, we'll call to 'callback' function with loaded items

    //For now, as there is no request, then we call with empty array
    callback([]);
}

//Create item in server
function createItem(item, callback) {

    console.log("createItem: " + JSON.stringify(item));

    //TODO Make POST request to create an item in the server
    //When request returned, call 'callback' with returned 
    //item as it has 'id' property. It is necessary to update
    //it or delete it

    //For now, as there is no request, then we call with id=0.
    item.id = '0'
    callback(item);
}

//Update item in server
function updateItem(item) {

    console.log("updateItem: " + JSON.stringify(item));

    //TODO Make PUT request to update the item in the server

}

//Delete item from server
function deleteItem(itemId) {

    console.log("deleteItem: " + itemId);

    //TODO Make DELETE request to remove the item in the server

}

//Show item in page
function showItem(item) {

    var checked = '';
    var style = '';

    if (item.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + item.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + item.description +
        '</span> <button>Delete</button></div>')
}

$(document).ready(function () {

    loadItems(function (items) {
        //When items are loaded from server
        for (var i = 0; i < items.length; i++) {
            showItem(items[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var itemDiv = elem.parent();
            var itemId = itemDiv.attr('id').split('-')[1];
            itemDiv.remove()
            deleteItem(itemId);
        }
    })

    //Handle items checkboxs
    info.change(function (event) {

        //Get page elements for item
        var checkbox = $(event.target);
        var itemDiv = checkbox.parent();
        var textSpan = itemDiv.find('span');

        //Read item info from elements
        var itemDescription = textSpan.text();
        var itemChecked = checkbox.prop('checked');
        var itemId = itemDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedItem = {
            id: itemId,
            description: itemDescription,
            checked: itemChecked
        }

        //Update item in server
        updateItem(updatedItem);

        //Update page when checked
        var style = itemChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-button").click(function () {

        var value = input.val();
        input.val('');

        var item = {
            description: value,
            checked: false
        }

        createItem(item, function (itemWithId) {
            //When item with id is returned from server
            showItem(itemWithId);
        });
    })
})