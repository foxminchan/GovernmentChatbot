"""Hello unit test module."""

from crawler.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello crawler"
