	$(document).on('click', '.push-exit', function()
	{
	    removePush(this)
	}).ready(function ()
	{
		loadLocalPush();
	});

	function guid()
	{
	    function s4()
	    {
	        return Math.floor((1 + Math.random()) * 0x10000)
	            .toString(16)
	            .substring(1);
	    }
	    return s4() + s4() + '-' + s4();
	}

	var pushes = 0;

	function addLocalPush(type, message, guid)
	{
	    item = {
	        type: type,
	        message: message,
	        status: true,
	        guid: 'P-' + guid
	    };

	    if (localStorage.pushes)
	    {
	        try
	        {
	            items = JSON.parse(localStorage.pushes);

	            for (i = 0; i < items.length; i++)
	            {
	                if (items[i].guid == 'P-' + guid)
	                {
	                    return false;
	                }
	            }

	            items[items.length] = item;
	            localStorage.setItem('pushes', JSON.stringify(items));
	        }
	        catch (err)
	        {
	            return false;
	        }
	    }
	    else
	    {
	        localStorage.setItem('pushes', JSON.stringify([item]));
	    }
	}

	function loadLocalPush()
	{
	    try
	    {
	        items = JSON.parse(localStorage.pushes);
	        for (i = 0; i < items.length; i++)
	        {
	            if (items[i].status)
	            {
	                createPush(items[i].type, items[i].message, items[i].guid);
	            }
	        }
	        return true;
	    }
	    catch (err)
	    {
	        return false;
	    }
	}

	function createPush(type, message, opt)
	{
	    var status = '<div class="' + getType(type) + ' push-status"></div>';
	    var text = '<div class="push-message"><i class="fa fa-times push-exit">X</i>' + message + '</div>';
	    var push_id = 'P-' + guid();
	    push_id = opt || push_id;
	    var html = '<div id="' + push_id + '" ' + (opt ? 'data-local' : '') + ' class="push-container">' + status + text + '</div>';

	    $('body').append(html);

	    $('#' + push_id).animate(
	    {
	        bottom: getBottom()
	    }, 250);

	    pushes++;
	    return true;
	}

	function getType(type)
	{
	    switch (type.toLowerCase())
	    {
	        case 'info':
	            return 'im im-icon-Information push-blue';
	        case 'danger':
	            return 'im im-icon-Danger push-red';
			//case 'success':
			//	return '';
	    }
	}

	function getBottom()
	{
	    if (!pushes)
	    {
	        return 10;
	    }
	    else
	    {
	        return (100 * pushes) + 10 + (pushes * 10);
	    }
	}

	function removeLocalPush(id)
	{
	    items = JSON.parse(localStorage.pushes);

	 
	        for (i = 0; i < items.length; i++)
	        {
	            if (items[i].guid == id)
	            {
	                items[i].status = false;
	            }
	        }
	        localStorage.setItem('pushes', JSON.stringify(items));
	}

	function removePush(elem)
	{
	    var container = $(elem).parents('.push-container');
	    if (container.data('local') != undefined)
	    {
	        removeLocalPush(container.attr('id'));
	    }
	    container.remove();
	    pushes--;
	    updatePushes();
	    return true;
	}

	function updatePushes()
	{
	    pushes = 0;
	    $('.push-container').each(function(i, o)
	    {
	        $(o).css('bottom', getBottom());
	        pushes++;
	    });
	    return true;
	}