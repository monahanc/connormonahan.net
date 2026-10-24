setup:
    npm ci

serve:
    npm run dev

build:
    npm run build

preview:
    npm run preview

deploy: build
    #!/usr/bin/env sh
    set -eu

    mise_env="$(mise env --shell bash)" || exit
    eval "$mise_env"
    unset mise_env

    if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
        printf '%s\n' "CLOUDFLARE_API_TOKEN is required; set it in Mise." >&2
        exit 1
    fi
    if [ -z "${CLOUDFRONT_DISTRIBUTION_ID:-}" ] || [ -z "${CLOUDFLARE_ZONE_ID:-}" ]; then
        printf '%s\n' "CloudFront distribution ID and Cloudflare zone ID must be configured in Mise." >&2
        exit 1
    fi

    aws s3 sync dist/ s3://connormonahan-net --delete
    aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths '/*'
    curl --fail-with-body --silent --show-error \
        --request POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
        --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        --header "Content-Type: application/json" \
        --data '{"hosts":["connormonahan.net"]}'
