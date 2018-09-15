# app-dev-testing-permissions-and-save
App to test various combinations of permissions and saving. 

These are the tests we need:

## Standard UI Save Tests - Basic Control Flow

These tests should use a very simple content-type (basically a title) just to verify the flow and correct find/save. Run this as a non-host user with edit-permissions only! Do not run as host, as you'll probably not discover important issues. 

1. Form in item-id mode (not content-group)
    1. Open form for new item, fill in, save
    1. open form for edit item, make change, save
1. Form in list-mode (content-group)
    1. Open form for edit-first (new) item, fill in, save
    1. Open form for add-directly (new) item, fill in, save
    1. Add dummy item using toolbar, then edit it, save
    1. edit existing item, save

## Public Form UI Tests

These tests should verify that permissions prevent / allow saving correctly. So the setup must be: 

1. a content-type which doesn't have permissions set - in this case an anonymous user who has the edit-button should get errors loading the schema already. 
1. a content-type which has create-permissions, but no schema permissions - again an anonyomus user should get errors
1. a content-type which has schema-permissions, but no others. 
    1. in this case create should fail
    1. in this case edit should fail
1. a content-type which has anonyomus schema permissions, and anonymous create-draft only
    1. an anonymous user should be able to create an item, but it should be draft right away
    1. an anonymous user should _not_ be able to edit it
1. a content-type which has anonyomus schema permissions, and anonymous edit-draft only
    1. an anonymous user should _not_ be able to create anything
    1. an anonymous user should be able to edit, but the result should be draft

## Semi-Public forms

These are forms which are not allowed for public users, but for registered users or users in a certain group. To test this, we must create a user-group and give only these the following permissions:

* read schema
* create (full-create, not draft)
* edit-draft only
* delete

We won't run all tests, but we want to be sure that the system correctly handles users as not anonymous, and that anonymous are not the same as users in a group. So we'll just want these tests:

1. an anonymous user should not be able to edit
1. an anonymous user should not be able to create
1. a user in that group should be able to create - both draft and live
1. a user in that group should only be able to edit into draft, not live
1. a user in that group should be able to delete

## DNN Workflow

2sxc supports the DNN (evoq) workflow. To verify this, we must check the following: on an Evoq with page-workflow enabled, a user should be able to make changes, but they should always result in...

* the page becoming versioned
* the live version to not show any changes (verify browsing with an anonymous browser to the same page)
* the version would have to be released/published for the changes to appear
* after publishing, everything should work again, so more edits should be possible

Prepare these tests: 

1. be able to add modules - it should now be in a future version and not published
1. on a published page, a user should be able to edit an item, and this change should cause a new page version (be draft), and not published 
1. on a published page with a list-2sxc-module, add an item. The standard effects should happen. 
1. on a published page with a list 2sxc module, re-order some items. The standard effects should happen. 
1. on a publishing page with a data-2sxc-module (items from query or `App.Data["..."]` edit an item. The standard effects should happen
