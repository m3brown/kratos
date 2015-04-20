teams = require('./api/teams')
users = require('./api/users')
user = require('./api/user')
audit = require('./api/audit')

module.exports = (app) ->
    app.get('/kratos/orgs/:org_id/teams/', teams.handle_get_teams)
    app.get('/kratos/orgs/:org_id/teams/:team_id', teams.handle_get_team)
    # add new team - no body
    app.put('/kratos/orgs/:org_id/teams/:team_id', teams.handle_create_team)

    # add user to team - no body
    app.put('/kratos/orgs/:org_id/teams/:team_id/roles/:role/:user_id/', teams.handle_add_member)
    # remove user from team - no body
    app.delete('/kratos/orgs/:org_id/teams/:team_id/roles/:role/:user_id/', teams.handle_remove_member)
    # add asset to team - content_type=application/json; {new: <string>}
    app.post('/kratos/orgs/:org_id/teams/:team_id/resources/:resource/', teams.handle_add_asset)
    # remove asset from team - no body
    app.delete('/kratos/orgs/:org_id/teams/:team_id/resources/:resource/:asset_id/', teams.handle_remove_asset)

    app.get('/kratos/users', users.handle_get_users)
    app.post('/kratos/users', users.handle_create_user)
    app.get('/kratos/users/:user_id', users.handle_get_user)
    # reactivate a deactivated user - no body
    app.put('/kratos/users/:user_id', users.handle_reactivate_user)
    # deactivate a user - no body
    app.delete('/kratos/users/:user_id', users.handle_deactivate_user)
    
    app.put('/kratos/users/:user_id/roles/:resource/:role', users.handle_add_role)
    app.delete('/kratos/users/:user_id/roles/:resource/:role', users.handle_remove_role)
    # merge data at path with put data
    app.put('/kratos/users/:user_id/data/:path?*', users.handle_add_data)
    # get the current logged-in user
    app.get('/kratos/user', user.handle_get_user)

    app.get('/kratos/audit', audit.handleGetAudit)