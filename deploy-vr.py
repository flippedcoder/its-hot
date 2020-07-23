import conducto as co


def cicd() -> co.Serial:
    image = co.Image(
        "node:current-alpine",
        copy_url="https://github.com/flippedcoder/its-hot",
        copy_branch="master"
    )

    install_node = co.Exec("npm i")
    test_node = co.Exec("CI=true; npm test")
    build_node = co.Exec("npm build")
    # TODO: update this to deploy to a real S3 bucket before 09/01
    deploy_node = co.Exec("echo secret stuff to deploy to an S3 bucket on AWS")

    pipeline = co.Serial(image=image, same_container=co.SameContainer.NEW)

    pipeline["Install dependencies..."] = install_node
    pipeline["Running tests..."] = test_node
    pipeline["Build project..."] = build_node
    pipeline["Deploy project..."] = deploy_node

    return pipeline


if __name__ == "__main__":
    co.main(default=cicd)
