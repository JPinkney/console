FROM scratch

ADD frontend/public/dist /opt/bridge/static
ADD bin/bridge /opt/bridge/bin/bridge
ADD etc/ssl /etc/ssl

# Doesn't require root.
USER 1001

CMD ["/opt/bridge/bin/bridge", "--public-dir=/opt/bridge/static"]
