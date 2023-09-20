$(document).ready(function () {
    const announcements = [];
    const links= [];
    let files = [];

    $('#openPopupBtn').click(function () {
        $('#announcementModal').modal('show');
    });

    // Saving annoucement
    $('#saveAnnouncement').click(function () {
        const heading = $('#announcementHeading').val();
        const description = $('#announcementDescription').val();

        if (heading && description) {
            const announcement = {
                heading,
                description,
            };

            announcements.push(announcement);

            // Displing announcement by function call
            displayAnnouncement(announcement);

            $('#announcementHeading').val('');
            $('#announcementDescription').val('');

            // Closing the modal
            $('#announcementModal').modal('hide');
        }
    });

    // Function to display an announcement on the webpage
    function displayAnnouncement(announcement) {
        const announcementHtml = `
            <div>
                <h4>${announcement.heading}</h4>
                <p>${announcement.description}</p>
            </div>
        `;

        $('.announcement-list').append(announcementHtml);
    }



// ============links================

$('#addLinkBtn').click(function () {
    $('#linkModal').modal('show');
});

// Save the link when the "Save" button in the link modal is clicked
$('#saveLink').click(function () {
    const linkUrl = $('#linkUrl').val();

    if (linkUrl) {
        const link = {
            url: linkUrl,
        };

        links.push(link);

        //function call
        displayLink(link);

        $('#linkUrl').val('');

        // Close the modal
        $('#linkModal').modal('hide');
    }
});

// Function to display a link on the webpage
function displayLink(link) {
    const linkHtml = `
        <div>
            <a href="${link.url}" target="_blank">${link.url}</a>
            <button class=" delete-link" data-url="${link.url}"><i class="ri-delete-bin-line"></i></button>
        </div>
    `;

    $('.link-list').append(linkHtml);

    // Add a click event listener to the "Delete" button
    $('.delete-link').click(function () {
        const urlToDelete = $(this).data('url');
        deleteLink(urlToDelete);
    });
}

// Function to delete a link from the array and the webpage
function deleteLink(urlToDelete) {
    // Remove the link from the array
    links = links.filter(link => link.url !== urlToDelete);

    // Remove the link from the webpage
    $(`.delete-link[data-url="${urlToDelete}"]`).closest('.alert').remove();
}


// ========== upload files===============

$('#uploadFileBtn').click(function () {
    $('#fileModal').modal('show');
});

// Handle file selection and save file when the "Upload" button in the file modal is clicked
$('#saveFile').click(function () {
    const fileInput = document.getElementById('fileToUpload');
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        files.push(selectedFile);

        displayFile(selectedFile);

        // Clear the input field
        fileInput.value = '';

        // Close the modal
        $('#fileModal').modal('hide');
    }
});

// Function to display a file on the webpage
function displayFile(file) {
    const fileName = file.name;

    const fileHtml = `
        <div class="alert alert-primary">
            <a href="#" class="file-link">${fileName}</a>
            <button class=" float-right delete-file"><i class="ri-delete-bin-line"></button>
        </div>
    `;

    $('.file-list').append(fileHtml);

    // Add a click event listener to the "Delete" button
    $('.delete-file').click(function () {
        const fileNameToDelete = $(this).siblings('.file-link').text();
        deleteFile(fileNameToDelete);
    });
}

// Function to delete a file from the array and the webpage
function deleteFile(fileNameToDelete) {
    // Remove the file from the array
    files = files.filter(file => file.name !== fileNameToDelete);

    // Remove the file from the webpage
    $(`.file-link:contains("${fileNameToDelete}")`).closest('.alert').remove();
}
});