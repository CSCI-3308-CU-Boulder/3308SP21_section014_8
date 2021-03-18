// Replace '-'s with spaces.
function addSpaces(str) {
    let newStr = str.replace(/-/g, ' ');
    return newStr;
}

// Capitalize the first letter in words.
function capitalizeFirst(str) {
    let newArr = str.split(' ');
    newArr.forEach((word, index) => {
        newArr[index] = word[0].toUpperCase() + word.substring(1);
    })
    return newArr.join(' ');
}

/* Function to add keys from the passed in object, change '-'s to spaces,
    capitalize the first letters, and add them to the dropdown menu. */
function addResorts(resortObj, classToAdd, idToAddTo) {
    resortList = Object.keys(resortObj);

    resortList.forEach((resort) => {
        let newListItem = $('<li>').addClass('dropdown-item text-light'),
            newATag = $('<a>');

        newATag.text(capitalizeFirst(addSpaces(resort)));
        newListItem.append(newATag);
        newListItem.attr('data-name', resort);
        newListItem.addClass(classToAdd);

        $('#' + idToAddTo).append(newListItem);
    })
}

