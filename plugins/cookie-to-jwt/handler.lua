local CookieToJWT = {
  PRIORITY = 1000,
  VERSION = "1.0"
}

function CookieToJWT:access(conf)

  local token = kong.request.get_cookie("token")

  if token then

    kong.service.request.set_header(
      "Authorization",
      "Bearer " .. token
    )

  end
end

return CookieToJWT